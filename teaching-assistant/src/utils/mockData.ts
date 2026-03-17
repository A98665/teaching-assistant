import { AnalysisResult, TeachingResource, Evaluation } from '../types';

// 示例教学方案
export const mockTeachingPlan = `课程名称：计算机科学导论
课时：32学时
教学目标：
1. 理解计算机科学的基本概念
2. 掌握编程基础
3. 了解算法和数据结构

教学内容：
第一章：计算机基础
- 计算机发展历史
- 计算机组成原理
- 操作系统基础

第二章：编程入门
- Python语言基础
- 变量和数据类型
- 控制结构

第三章：算法与数据结构
- 常见算法
- 数据结构基础
- 算法复杂度分析`;

// 模拟分析结果
export const mockAnalysisResult: AnalysisResult = {
  summary: '该教学方案结构清晰，涵盖了计算机科学的基础内容。建议增加实践环节，加强学生的动手能力培养。',
  keyPoints: [
    '课程目标明确，层次分明',
    '内容覆盖计算机科学核心领域',
    '建议增加项目实践环节',
    '可考虑引入更多案例教学'
  ],
  suggestions: [
    '增加编程实践课时',
    '添加小组项目作业',
    '引入在线编程平台',
    '提供更多学习资源'
  ]
};

// 模拟教学资源列表
export const mockResources: TeachingResource[] = [
  {
    id: '1',
    title: '计算机科学导论PPT',
    type: 'ppt',
    size: '15.2 MB',
    url: '#',
    description: '第一章至第三章完整课件'
  },
  {
    id: '2',
    title: 'Python编程入门视频',
    type: 'video',
    size: '256 MB',
    url: '#',
    description: '基础语法和实例讲解'
  },
  {
    id: '3',
    title: '算法可视化图片集',
    type: 'image',
    size: '8.5 MB',
    url: '#',
    description: '常见算法的可视化展示'
  },
  {
    id: '4',
    title: '课程教学大纲',
    type: 'document',
    size: '2.1 MB',
    url: '#',
    description: '详细的教学计划和考核方式'
  },
  {
    id: '5',
    title: '数据结构PPT',
    type: 'ppt',
    size: '12.8 MB',
    url: '#',
    description: '第三章数据结构部分课件'
  },
  {
    id: '6',
    title: '编程实践案例视频',
    type: 'video',
    size: '180 MB',
    url: '#',
    description: '实际项目开发演示'
  }
];

// 模拟评估数据
export const mockEvaluations: Evaluation[] = [
  {
    resourceId: '1',
    rating: 5,
    comment: '课件内容详实，结构清晰',
    timestamp: Date.now() - 86400000
  },
  {
    resourceId: '2',
    rating: 4,
    comment: '视频讲解清楚，但语速稍快',
    timestamp: Date.now() - 172800000
  },
  {
    resourceId: '3',
    rating: 5,
    comment: '图片质量很高，有助于理解',
    timestamp: Date.now() - 259200000
  }
];
