import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { sanityClient, urlFor } from '../lib/sanity';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Fetch all posts ordered by publishedAt date
                const query = `*[_type == "post"] | order(publishedAt desc) {
                    _id,
                    title,
                    slug,
                    mainImage,
                    publishedAt,
                    _createdAt,
                    excerpt,
                    "authorName": author->name,
                    "authorImage": author->image
                }`;
                const data = await sanityClient.fetch(query);
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const fadeUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.6 }
    };

    return (
        <>
            <Helmet>
                <title>Blog | Angels Cleaning Services</title>
                <meta name="description" content="Read the latest cleaning tips, company news, and home maintenance advice from the Angels Cleaning team." />
            </Helmet>

            <section className="relative pt-32 pb-20 bg-gradient-to-br from-sky-pale to-white overflow-hidden min-h-[40vh] flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                    <motion.div className="max-w-3xl mx-auto text-center" {...fadeUp}>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-navy mb-6 leading-tight">
                            Cleaning Tips & <span className="text-primary block mt-2">Expert Advice</span>
                        </h1>
                        <p className="text-xl text-charcoal/80 mb-8 leading-relaxed">
                            Discover the best practices for maintaining a spotless home from our professional cleaning experts.
                        </p>
                    </motion.div>
                </div>
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-sky-light/50 rounded-full blur-3xl"></div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-20 bg-sky-pale rounded-3xl">
                            <span className="material-symbols-outlined text-6xl text-primary/40 mb-4 block">stylus</span>
                            <h3 className="text-2xl font-bold text-navy mb-2">No posts yet</h3>
                            <p className="text-charcoal/80">Check back soon for our first article!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {posts.map((post, index) => (
                                <motion.article
                                    key={post._id}
                                    className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-sky-pale hover:border-primary/30 transition-all hover:shadow-2xl hover:-translate-y-2 group flex flex-col h-full"
                                    {...fadeUp}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                >
                                    <Link to={`/blog/${post.slug.current}`} className="block h-64 overflow-hidden relative">
                                        {post.mainImage ? (
                                            <img
                                                src={urlFor(post.mainImage).width(800).height(600).url()}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-sky-light flex items-center justify-center">
                                                <span className="material-symbols-outlined text-primary/20 text-6xl">image</span>
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                            {new Date(post.publishedAt || post._createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                    </Link>

                                    <div className="p-8 flex-1 flex flex-col">
                                        <Link to={`/blog/${post.slug.current}`}>
                                            <h2 className="text-2xl font-bold text-navy mb-4 group-hover:text-primary transition-colors line-clamp-2">
                                                {post.title}
                                            </h2>
                                        </Link>
                                        {/* Sanity portable text excerpt fallback or specific block */}
                                        <p className="text-charcoal/80 line-clamp-3 mb-6 flex-1">
                                            {/* Attempting to get excerpt from portable text blocks if it's not a plain string */}
                                            {typeof post.excerpt === 'string'
                                                ? post.excerpt
                                                : "Read more about this topic in our detailed article..."}
                                        </p>

                                        <div className="flex items-center justify-between border-t border-sky-pale pt-6 mt-auto">
                                            <div className="flex items-center space-x-3">
                                                {post.authorImage ? (
                                                    <img src={urlFor(post.authorImage).width(100).height(100).url()} alt={post.authorName} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                        {post.authorName ? post.authorName.charAt(0) : 'A'}
                                                    </div>
                                                )}
                                                <span className="text-sm font-bold text-navy">{post.authorName || 'Angels Team'}</span>
                                            </div>
                                            <Link to={`/blog/${post.slug.current}`} className="w-10 h-10 rounded-full bg-sky-pale text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                                <span className="material-icons">arrow_forward</span>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Blog;
