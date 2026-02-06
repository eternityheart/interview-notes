import ExpandableCard from '@/components/ExpandableCard';
import Header from '@/components/Header';
import { Briefcase, Code2, Rocket, BookOpen } from 'lucide-react';

/**
 * Design Philosophy: Modern Academic Aesthetic
 * - Responsive card-based layout with progressive disclosure
 * - Blue and white color scheme for clarity and professionalism
 * - Smooth animations and hover effects
 * - Mobile-first responsive design
 */

export default function Home() {
  const sections = [
    {
      id: 'resume',
      title: '面试简历',
      icon: '🎯',
      description: '个人信息、教育背景、工作经历、技能清单',
      iconBgColor: 'bg-blue-500',
      items: [
        {
          id: 'resume-1',
          title: '基本信息',
          description: '姓名、联系方式、GitHub、个人博客',
        },
        {
          id: 'resume-2',
          title: '教育背景',
          description: '学校、专业、GPA、重要课程',
        },
        {
          id: 'resume-3',
          title: '工作经历',
          description: '公司、职位、时间、主要成就',
        },
        {
          id: 'resume-4',
          title: '技能清单',
          description: '编程语言、框架、工具、软技能',
        },
        {
          id: 'resume-5',
          title: '获奖荣誉',
          description: '竞赛奖项、学术荣誉、其他认可',
        },
      ],
    },
    {
      id: 'algorithms',
      title: '算法题目',
      icon: '💻',
      description: '分类整理的算法题目笔记和解题思路',
      iconBgColor: 'bg-purple-500',
      items: [
        {
          id: 'algo-1',
          title: '二分查找',
          description: '基础概念、模板、常见变体、经典题目',
        },
        {
          id: 'algo-2',
          title: '二维数组',
          description: '矩阵遍历、旋转、搜索等问题',
        },
        {
          id: 'algo-3',
          title: '找到两个边界',
          description: '边界查找、区间问题、双指针',
        },
        {
          id: 'algo-4',
          title: '旋转数组',
          description: '旋转数组查找、最小值、排序',
        },
        {
          id: 'algo-5',
          title: '旋转数组找最小的',
          description: '进阶问题、重复元素处理',
        },
        {
          id: 'algo-6',
          title: '两个数组找中位数',
          description: '分治法、二分查找应用',
        },
        {
          id: 'algo-7',
          title: '回溯算法',
          description: '排列、组合、子集、N皇后',
        },
        {
          id: 'algo-8',
          title: '动态规划',
          description: '背包问题、最长子序列、状态转移',
        },
        {
          id: 'algo-9',
          title: '图论算法',
          description: 'BFS、DFS、最短路径、拓扑排序',
        },
        {
          id: 'algo-10',
          title: '字符串处理',
          description: 'KMP、正则表达式、编辑距离',
        },
      ],
    },
    {
      id: 'projects',
      title: '项目准备',
      icon: '🚀',
      description: '个人项目、技术栈、核心功能、项目成果',
      iconBgColor: 'bg-green-500',
      items: [
        {
          id: 'proj-1',
          title: '项目一：电商平台',
          description: '技术栈：React + Node.js + MongoDB，核心功能：商品展示、购物车、支付',
        },
        {
          id: 'proj-2',
          title: '项目二：社交应用',
          description: '技术栈：Flutter + Firebase，核心功能：用户认证、动态发布、实时聊天',
        },
        {
          id: 'proj-3',
          title: '项目三：数据可视化',
          description: '技术栈：Vue.js + D3.js，核心功能：数据分析、图表展示、交互',
        },
        {
          id: 'proj-4',
          title: '项目四：开源贡献',
          description: '参与开源项目、提交PR、解决Issue',
        },
      ],
    },
    {
      id: 'learning',
      title: '日常学习',
      icon: '📚',
      description: '八股文、设计模式、系统设计、学习笔记',
      iconBgColor: 'bg-orange-500',
      items: [
        {
          id: 'learn-1',
          title: '八股文：Java基础',
          description: '面向对象、集合框架、多线程、JVM',
        },
        {
          id: 'learn-2',
          title: '八股文：数据库',
          description: 'SQL语法、事务、索引、优化、NoSQL',
        },
        {
          id: 'learn-3',
          title: '八股文：网络协议',
          description: 'TCP/IP、HTTP/HTTPS、DNS、CDN',
        },
        {
          id: 'learn-4',
          title: '设计模式',
          description: '创建型、结构型、行为型、应用场景',
        },
        {
          id: 'learn-5',
          title: '系统设计',
          description: '可扩展性、高可用、分布式、缓存、消息队列',
        },
        {
          id: 'learn-6',
          title: '操作系统',
          description: '进程、线程、内存管理、文件系统',
        },
        {
          id: 'learn-7',
          title: '计算机网络',
          description: '网络模型、协议栈、性能优化',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
      <Header />
      {/* Hero Section */}
      <div id="resume"
        className="relative py-8 md:py-16 px-4 md:px-8"
        style={{
          backgroundImage:
            'url(https://private-us-east-1.manuscdn.com/sessionFile/KfTBnQi7PagsR3n2jHktXt/sandbox/9tClIF46P3auOOcsRAHWgi-img-1_1770348700000_na1fn_aGVyby1iYWNrZ3JvdW5k.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvS2ZUQm5RaTdQYWdzUjNuMmpIa3RYdC9zYW5kYm94Lzl0Q2xJRjQ2UDNhdU9PY3NSQUhXZ2ktaW1nLTFfMTc3MDM0ODcwMDAwMF9uYTFmbl9hR1Z5YnkxaVlXTnJaM0p2ZFc1ay5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=kSCA7~EMfARyue5lsjRsKTHDhA4mbFiSjR7N6KoZ11Gehi8CXG55zu70RodG2Ynn4gPE6U0-qY-6hXkqKBivErn7e8NNUNQkyBj8~0fUIFHhAPNSyXJ4-u~tdFamjgTJs3rMBEIw1D6mpkCgggLe~twlqszfX8VJe1etWd6sEV7Qvdyf-X8StRGl~A2Y4LvwMxa9qV7eFo8QaWtCMihjWLFnZ6eQj7yW1EovAx8Ki5wJnmS87bUDcHMxSqX5NfsQfhpGzKcsm92FJI4epL7ziR1PMX5wCJWPSf2qc0mZm17bAqDAM61wOGl4LFT~5i~1l6L7YRcUZsUtSS10js~Xmg__)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-white/70"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            明德惟馨的面试心得
          </h1>
          <p className="text-base md:text-xl text-gray-600 mb-2">
            个人学习笔记与面试准备平台
          </p>
          <p className="text-xs md:text-base text-gray-500">
            整理算法题目、项目经历、技术知识，为面试做好充分准备
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {sections.map((section, index) => (
            <div
              key={section.id}
              id={section.id}
              className="animate-slide-in"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <ExpandableCard
                id={section.id}
                title={section.title}
                icon={section.icon}
                description={section.description}
                items={section.items}
                iconBgColor={section.iconBgColor}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-blue-50 to-white border-t border-blue-200 py-6 md:py-10">
        <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
          <p className="text-gray-600 text-xs md:text-base mb-2">
            💡 持续学习，不断进步
          </p>
          <p className="text-gray-500 text-xs">
            © 2026 明德惟馨的面试心得 | 最后更新：{new Date().toLocaleDateString('zh-CN')}
          </p>
        </div>
      </div>
    </div>
  );
}
