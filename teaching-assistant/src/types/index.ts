// 教学方案输入类型
export type InputMethod = 'text' | 'file' | 'url' | 'template';

export interface TeachingPlan {
  content: string;
  inputMethod: InputMethod;
  file?: File;
  url?: string;
  templateId?: string;
}

// 分析结果类型
export interface AnalysisResult {
  summary: string;
  keyPoints: string[];
  suggestions: string[];
}

// 教学资源类型
export type ResourceType = 'ppt' | 'video' | 'image' | 'document';

export interface TeachingResource {
  id: string;
  title: string;
  type: ResourceType;
  size: string;
  url: string;
  description?: string;
}

// 评估类型
export interface Evaluation {
  resourceId: string;
  rating: number;
  comment?: string;
  timestamp: number;
}

export interface EvaluationStats {
  averageRating: number;
  totalEvaluations: number;
}
