import React from 'react';
import { Folder, FileText, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NewLaunch() {
    return (
        <section className="w-full py-16 px-4 bg-white border-t border-[var(--color-primary-lightest)]">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-5xl mx-auto text-center"
            >
                {/* New Launch Badge */}
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
                    className="inline-block mb-6"
                >
                    <span className="bg-[var(--color-primary-lightest)] text-[var(--color-primary)] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[var(--color-primary-light-2)]">
                        New Launch
                    </span>
                </motion.div>

                {/* Logo and Title */}
                <div className="mb-2">
                    <h2 className="text-xl md:text-xl font-black text-[var(--color-dark)] uppercase tracking-tight">
                        Pune Dream <span className="text-[var(--color-primary)]">H</span>omes
                    </h2>
                </div>

                {/* Subtitle */}
                <p className="text-sm text-[var(--color-neutral)] mb-12 font-semibold tracking-wide uppercase">
                    Encyclopedia For All New Projects
                </p>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Directory Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="group bg-white border border-[var(--color-primary-lightest)] rounded-2xl p-8 text-center hover:shadow-2xl hover:border-[var(--color-primary-light-1)] transition-all duration-300"
                    >
                        <div className="w-14 h-14 bg-[var(--color-primary-lightest)] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                            <Folder className="w-7 h-7 text-[var(--color-primary)]" />
                        </div>
                        <h3 className="text-sm font-bold text-[var(--color-dark)] leading-tight uppercase tracking-tighter">
                            Directory for All <br /> New Projects
                        </h3>
                    </motion.div>

                    {/* Reports Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="group bg-white border border-[var(--color-primary-lightest)] rounded-2xl p-8 text-center hover:shadow-2xl hover:border-[var(--color-primary-light-1)] transition-all duration-300"
                    >
                        <div className="w-14 h-14 bg-[var(--color-primary-lightest)] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                            <FileText className="w-7 h-7 text-[var(--color-primary)]" />
                        </div>
                        <h3 className="text-sm font-bold text-[var(--color-dark)] leading-tight uppercase tracking-tighter">
                            All Reports <br /> from RERA
                        </h3>
                    </motion.div>

                    {/* Expert Reviews Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="group bg-white border border-[var(--color-primary-lightest)] rounded-2xl p-8 text-center hover:shadow-2xl hover:border-[var(--color-primary-light-1)] transition-all duration-300"
                    >
                        <div className="w-14 h-14 bg-[var(--color-primary-lightest)] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                            <MessageSquare className="w-7 h-7 text-[var(--color-primary)]" />
                        </div>
                        <h3 className="text-sm font-bold text-[var(--color-dark)] leading-tight uppercase tracking-tighter">
                            Expert Reviews <br /> & Advice
                        </h3>
                    </motion.div>
                </div>

                {/* CTA Button */}
                <motion.button
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark-1)] text-white font-bold py-4 px-10 rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-xl active:scale-95"
                >
                    View All New projects
                </motion.button>
            </motion.div>
        </section>
    );
}
