import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { PortableText } from '@portabletext/react';
import { sanityClient, urlFor } from '../lib/sanity';

// Custom components for Portable Text rendering to match Tailwind typography
const ptComponents = {
    types: {
        image: ({ value }) => {
            if (!value?.asset?._ref) {
                return null;
            }
            return (
                <div className="my-12">
                    <img
                        alt={value.alt || ' '}
                        loading="lazy"
                        src={urlFor(value).width(1200).url()}
                        className="w-full rounded-[2rem] shadow-xl object-cover"
                    />
                    {value.caption && <p className="text-center text-sm text-charcoal/60 mt-4 italic">{value.caption}</p>}
                </div>
            );
        },
    },
    block: {
        h1: ({ children }) => <h1 className="text-4xl font-black text-navy mt-16 mb-6">{children}</h1>,
        h2: ({ children }) => <h2 className="text-3xl font-black text-navy mt-12 mb-5">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-bold text-navy mt-10 mb-4">{children}</h3>,
        h4: ({ children }) => <h4 className="text-xl font-bold text-navy mt-8 mb-4">{children}</h4>,
        normal: ({ children }) => <p className="text-lg text-charcoal/80 mb-6 leading-relaxed">{children}</p>,
        blockquote: ({ children }) => <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 text-xl italic text-navy/80 bg-sky-pale rounded-r-xl">{children}</blockquote>,
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc list-outside ml-6 mb-8 text-lg text-charcoal/80 space-y-2">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal list-outside ml-6 mb-8 text-lg text-charcoal/80 space-y-2">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }) => <li className="pl-2">{children}</li>,
    },
    marks: {
        strong: ({ children }) => <strong className="font-bold text-navy">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        link: ({ children, value }) => {
            const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
            return (
                <a href={value.href} rel={rel} className="text-primary hover:text-navy underline transition-colors font-medium">
                    {children}
                </a>
            );
        },
    },
};

const BlogPost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const query = `*[_type == "post" && slug.current == $slug][0] {
                    title,
                    mainImage,
                    body,
                    publishedAt,
                    _createdAt,
                    "authorName": author->name,
                    "authorImage": author->image,
                    "categories": categories[]->title
                }`;
                const data = await sanityClient.fetch(query, { slug });
                setPost(data);
            } catch (error) {
                console.error("Error fetching post:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    const fadeUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen pt-40 pb-20 text-center">
                <h1 className="text-4xl font-black text-navy mb-4">Post Not Found</h1>
                <p className="text-lg text-charcoal/80 mb-8">The article you are looking for does not exist.</p>
                <Link to="/blog" className="text-primary hover:underline font-bold">Return to Blog</Link>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{post.title} | Angels Cleaning Blog</title>
                <meta name="description" content={`Read about ${post.title} by ${post.authorName || 'Angels Cleaning'}`} />
            </Helmet>

            <article className="pt-32 pb-24 bg-white min-h-screen">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp} className="mb-12">
                        <Link to="/blog" className="inline-flex items-center text-primary font-bold hover:text-navy transition-colors mb-8">
                            <span className="material-icons mr-2">arrow_back</span>
                            Back to Articles
                        </Link>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {post.categories?.map(category => (
                                <span key={category} className="bg-sky-pale text-primary text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                                    {category}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-navy mb-8 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex items-center space-x-4 mb-10 border-b border-sky-pale pb-8">
                            {post.authorImage ? (
                                <img src={urlFor(post.authorImage).width(100).height(100).url()} alt={post.authorName} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md" />
                            ) : (
                                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                                    {post.authorName ? post.authorName.charAt(0) : 'A'}
                                </div>
                            )}
                            <div>
                                <h3 className="font-bold text-navy text-lg">{post.authorName || 'Angels Team'}</h3>
                                <p className="text-charcoal/60 text-sm">
                                    {new Date(post.publishedAt || post._createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {post.mainImage && (
                        <motion.div
                            {...fadeUp}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="mb-16 -mx-4 sm:mx-0"
                        >
                            <img
                                src={urlFor(post.mainImage).width(1200).height(700).url()}
                                alt={post.title}
                                className="w-full sm:rounded-[3rem] shadow-2xl object-cover"
                            />
                        </motion.div>
                    )}

                    <motion.div
                        {...fadeUp}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="max-w-3xl mx-auto prose prose-lg prose-blue"
                    >
                        <PortableText value={post.body} components={ptComponents} />
                    </motion.div>

                    <motion.div
                        {...fadeUp}
                        transition={{ delay: 0.6 }}
                        className="mt-20 pt-10 border-t border-sky-pale text-center max-w-2xl mx-auto"
                    >
                        <h3 className="text-2xl font-bold text-navy mb-4">Want more spotless results?</h3>
                        <p className="text-charcoal/80 mb-8">Let the Angels work their magic in your home. Get a fast, free estimate for your detailed cleaning service.</p>
                        <Link to="/contact" className="inline-block bg-primary text-white hover:bg-navy px-10 py-5 rounded-full font-bold transition-all shadow-xl hover:-translate-y-2">
                            Request a Free Quote
                        </Link>
                    </motion.div>
                </div>
            </article>
        </>
    );
};

export default BlogPost;
