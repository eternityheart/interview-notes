import { ChevronLeft, ChevronDown, ChevronRight, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import { javaCompilerReturnLogicContent } from '@/data/syntaxData';

/**
 * 语法特性详情页面
 * 展示 Java 语法特性相关的深度解析
 */

interface ExampleCardProps {
    number: number;
    title: string;
    content: string;
    defaultOpen?: boolean;
}

function ExampleCard({ number, title, content, defaultOpen = false }: ExampleCardProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="bg-white rounded-xl shadow-lg border border-purple-100 overflow-hidden mb-6">
            {/* 标题栏 - 使用紫色渐变区分 */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center gap-4 p-5 hover:bg-purple-50 transition-colors text-left"
            >
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-lg">
                    {number}
                </span>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                </div>
                {isOpen ? (
                    <ChevronDown className="w-5 h-5 text-purple-500" />
                ) : (
                    <ChevronRight className="w-5 h-5 text-purple-500" />
                )}
            </button>

            {/* 内容区域 */}
            {isOpen && (
                <div className="border-t border-purple-100 p-6 bg-gradient-to-b from-purple-50/30 to-white">
                    <MarkdownRenderer content={content} />
                </div>
            )}
        </div>
    );
}

// 复用 Markdown 渲染器 (可以考虑抽离成组件，但现在先复制以保持独立性)
function MarkdownRenderer({ content }: { content: string }) {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeBlockLang = '';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let inTable = false;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let tableRows: string[][] = [];
    let key = 0;

    // 处理内联代码和加粗
    const processInlineStyles = (text: string): React.ReactNode[] => {
        const parts = text.split(/(`[^`]+`)/g);
        const result: React.ReactNode[] = [];

        parts.forEach((part, i) => {
            if (part.startsWith('`') && part.endsWith('`')) {
                result.push(
                    <code key={`code-${i}`} className="bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded text-sm font-mono mx-0.5">
                        {part.slice(1, -1)}
                    </code>
                );
            } else {
                // 处理加粗
                const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
                boldParts.forEach((bp, j) => {
                    if (bp.startsWith('**') && bp.endsWith('**')) {
                        result.push(
                            <strong key={`bold-${i}-${j}`} className="text-purple-700 font-semibold">
                                {bp.slice(2, -2)}
                            </strong>
                        );
                    } else if (bp) {
                        result.push(<span key={`text-${i}-${j}`}>{bp}</span>);
                    }
                });
            }
        });

        return result;
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // 代码块处理
        if (line.startsWith('```')) {
            if (!inCodeBlock) {
                inCodeBlock = true;
                codeBlockLang = line.slice(3).trim();
                codeBlockContent = [];
            } else {
                inCodeBlock = false;
                const isJava = codeBlockLang === 'java';
                elements.push(
                    <div key={key++} className="my-4 rounded-lg overflow-hidden shadow-md">
                        {codeBlockLang && (
                            <div className="bg-gray-800 text-gray-300 px-4 py-2 text-xs font-mono flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                <span className="ml-2">{codeBlockLang}</span>
                            </div>
                        )}
                        <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto text-sm font-mono leading-relaxed">
                            <code>
                                {codeBlockContent.map((codeLine, ci) => (
                                    <div key={ci} className="hover:bg-gray-800/50">
                                        <span className="text-gray-500 select-none mr-4 inline-block w-6 text-right">
                                            {ci + 1}
                                        </span>
                                        {isJava ? highlightJavaCode(codeLine) : codeLine}
                                    </div>
                                ))}
                            </code>
                        </pre>
                    </div>
                );
                codeBlockContent = [];
            }
            continue;
        }

        if (inCodeBlock) {
            codeBlockContent.push(line);
            continue;
        }

        // 引用块 (Blockquote) 处理
        if (line.startsWith('> ')) {
            elements.push(
                <blockquote key={key++} className="border-l-4 border-purple-500 pl-4 py-2 my-4 bg-purple-50 text-gray-700 italic rounded-r">
                    {processInlineStyles(line.slice(2))}
                </blockquote>
            );
            continue;
        }

        // 空行
        if (line.trim() === '') {
            continue;
        }

        // 分隔线
        if (line.match(/^---+$/)) {
            elements.push(
                <hr key={key++} className="my-8 border-purple-200" />
            );
            continue;
        }

        // 标题
        if (line.startsWith('## ')) {
            elements.push(
                <h2 key={key++} className="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2 border-b-2 border-purple-400 flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-purple-500" />
                    {processInlineStyles(line.slice(3))}
                </h2>
            );
            continue;
        }

        if (line.startsWith('### ')) {
            elements.push(
                <h3 key={key++} className="text-xl font-semibold text-gray-800 mt-6 mb-3 flex items-center gap-2">
                    <span className="w-2 h-6 bg-purple-500 rounded-full"></span>
                    {processInlineStyles(line.slice(4))}
                </h3>
            );
            continue;
        }

        // 列表项
        if (line.match(/^[\-\*]\s/)) {
            elements.push(
                <div key={key++} className="flex items-start gap-3 my-2 ml-4">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700 leading-relaxed">{processInlineStyles(line.slice(2))}</span>
                </div>
            );
            continue;
        }

        // 数字列表
        const numMatch = line.match(/^(\d+)\.\s(.*)$/);
        if (numMatch) {
            elements.push(
                <div key={key++} className="flex items-start gap-3 my-3 ml-4">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center text-sm font-bold shadow">
                        {numMatch[1]}
                    </span>
                    <span className="text-gray-700 leading-relaxed pt-0.5">{processInlineStyles(numMatch[2])}</span>
                </div>
            );
            continue;
        }

        // 普通段落
        elements.push(
            <p key={key++} className="text-gray-700 my-3 leading-relaxed">
                {processInlineStyles(line)}
            </p>
        );
    }

    return <div className="algorithm-content">{elements}</div>;
}

// Java 代码高亮
function highlightJavaCode(line: string): React.ReactNode {
    const keywords = ['int', 'if', 'else', 'return', 'Integer', 'void', 'public', 'private', 'static', 'class', 'new', 'double', 'throw', 'while'];
    let result = line;

    // 处理注释
    const commentMatch = line.match(/^(\s*)(\/\/.*)$/);
    if (commentMatch) {
        return (
            <>
                <span>{commentMatch[1]}</span>
                <span className="text-green-500 italic font-medium">{commentMatch[2]}</span>
            </>
        );
    }

    return result;
}

export default function SyntaxDetail() {
    const examples = [
        {
            number: 1,
            title: 'Java 编译器逻辑：为什么必须写 return 0.0？',
            content: javaCompilerReturnLogicContent,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-pink-50">
            <Header />

            {/* 页面标题 */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <Link href="/" className="inline-flex items-center gap-2 text-purple-100 hover:text-white mb-4 transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                        <span>返回首页</span>
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">Java 语法特性</h1>
                    <p className="text-purple-100 text-lg">
                        深入解析 Java 编译器行为、语法糖与底层逻辑
                    </p>
                </div>
            </div>

            {/* 内容区域 */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* 简介卡片 */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 border-purple-500">
                    <h2 className="text-xl font-bold text-gray-800 mb-3">🧠 核心概念</h2>
                    <p className="text-gray-600 leading-relaxed">
                        编程不仅是写出正确的逻辑，更是与<strong className="text-purple-600">编译器</strong>的对话。
                        理解编译器如何思考（控制流分析），有助于编写更健壮、更符合工业规范的代码。
                    </p>
                </div>

                {/* 例题列表 */}
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center">
                        💡
                    </span>
                    特性解析
                </h2>

                {examples.map((example) => (
                    <ExampleCard
                        key={example.number}
                        number={example.number}
                        title={example.title}
                        content={example.content}
                        defaultOpen={true}
                    />
                ))}
            </div>

            {/* 页脚 */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-t border-purple-200 py-8">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <p className="text-gray-600 text-sm">
                        📖 持续更新中... 更多 Java 语法特性即将解析
                    </p>
                </div>
            </div>
        </div>
    );
}
