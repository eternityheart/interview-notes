import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface AlgorithmDetailProps {
    title: string;
    content: string;
    isOpen?: boolean;
}

export default function AlgorithmDetail({ title, content, isOpen = false }: AlgorithmDetailProps) {
    const [expanded, setExpanded] = useState(isOpen);

    return (
        <div className="border border-blue-200 rounded-lg overflow-hidden mb-4 bg-white shadow-sm">
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between p-4 hover:bg-blue-50 transition-colors"
            >
                <span className="text-lg font-semibold text-gray-800">{title}</span>
                {expanded ? (
                    <ChevronDown className="w-5 h-5 text-blue-500" />
                ) : (
                    <ChevronRight className="w-5 h-5 text-blue-500" />
                )}
            </button>

            {expanded && (
                <div className="border-t border-blue-100 p-6 bg-gradient-to-b from-blue-50/50 to-white">
                    <div className="prose prose-blue max-w-none">
                        <MarkdownContent content={content} />
                    </div>
                </div>
            )}
        </div>
    );
}

// 简单的 Markdown 渲染组件
function MarkdownContent({ content }: { content: string }) {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeBlockLang = '';
    let inTable = false;
    let tableRows: string[][] = [];
    let key = 0;

    const processInlineCode = (text: string) => {
        const parts = text.split(/(`[^`]+`)/g);
        return parts.map((part, i) => {
            if (part.startsWith('`') && part.endsWith('`')) {
                return (
                    <code key={i} className="bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded text-sm font-mono">
                        {part.slice(1, -1)}
                    </code>
                );
            }
            // 处理加粗
            const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
            return boldParts.map((bp, j) => {
                if (bp.startsWith('**') && bp.endsWith('**')) {
                    return <strong key={`${i}-${j}`} className="text-blue-700 font-semibold">{bp.slice(2, -2)}</strong>;
                }
                return bp;
            });
        });
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
                elements.push(
                    <pre key={key++} className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 text-sm">
                        <code>{codeBlockContent.join('\n')}</code>
                    </pre>
                );
                codeBlockContent = [];
            }
            continue;
        }

        if (inCodeBlock) {
            codeBlockContent.push(line);
            continue;
        }

        // 表格处理
        if (line.startsWith('|') && line.endsWith('|')) {
            if (!inTable) {
                inTable = true;
                tableRows = [];
            }
            const cells = line.split('|').slice(1, -1).map(c => c.trim());
            // 跳过分隔行
            if (!cells.every(c => c.match(/^[-:]+$/))) {
                tableRows.push(cells);
            }
            continue;
        } else if (inTable) {
            inTable = false;
            if (tableRows.length > 0) {
                elements.push(
                    <div key={key++} className="overflow-x-auto my-4">
                        <table className="min-w-full border-collapse border border-blue-200">
                            <thead>
                                <tr className="bg-blue-100">
                                    {tableRows[0].map((cell, ci) => (
                                        <th key={ci} className="border border-blue-200 px-4 py-2 text-left font-semibold text-gray-700">
                                            {processInlineCode(cell)}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {tableRows.slice(1).map((row, ri) => (
                                    <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-blue-50/30'}>
                                        {row.map((cell, ci) => (
                                            <td key={ci} className="border border-blue-200 px-4 py-2 text-gray-600">
                                                {processInlineCode(cell)}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
                tableRows = [];
            }
        }

        // 空行
        if (line.trim() === '') {
            continue;
        }

        // 分隔线
        if (line.match(/^---+$/)) {
            elements.push(<hr key={key++} className="my-6 border-blue-200" />);
            continue;
        }

        // 标题
        if (line.startsWith('## ')) {
            elements.push(
                <h2 key={key++} className="text-2xl font-bold text-blue-700 mt-6 mb-4 pb-2 border-b border-blue-200">
                    {processInlineCode(line.slice(3))}
                </h2>
            );
            continue;
        }

        if (line.startsWith('### ')) {
            elements.push(
                <h3 key={key++} className="text-xl font-semibold text-gray-800 mt-5 mb-3">
                    {processInlineCode(line.slice(4))}
                </h3>
            );
            continue;
        }

        if (line.startsWith('#### ')) {
            elements.push(
                <h4 key={key++} className="text-lg font-semibold text-purple-700 mt-4 mb-2">
                    {processInlineCode(line.slice(5))}
                </h4>
            );
            continue;
        }

        // 列表项
        if (line.match(/^[\-\*]\s/)) {
            elements.push(
                <div key={key++} className="flex items-start gap-2 my-2 ml-4">
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="text-gray-700">{processInlineCode(line.slice(2))}</span>
                </div>
            );
            continue;
        }

        // 数字列表
        if (line.match(/^\d+\.\s/)) {
            const match = line.match(/^(\d+)\.\s(.*)$/);
            if (match) {
                elements.push(
                    <div key={key++} className="flex items-start gap-3 my-2 ml-4">
                        <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                            {match[1]}
                        </span>
                        <span className="text-gray-700">{processInlineCode(match[2])}</span>
                    </div>
                );
                continue;
            }
        }

        // 普通段落
        elements.push(
            <p key={key++} className="text-gray-700 my-3 leading-relaxed">
                {processInlineCode(line)}
            </p>
        );
    }

    return <div className="algorithm-content">{elements}</div>;
}
