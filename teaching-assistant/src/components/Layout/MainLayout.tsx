import { useState } from 'react';
import TeachingPlanInput from '../Section1/TeachingPlanInput';
import AnalysisDisplay from '../Section2/AnalysisDisplay';
import ResourceList from '../Section2/ResourceList';
import EvaluationPanel from '../Section3/EvaluationPanel';
import { InputMethod, AnalysisResult, TeachingResource, Evaluation } from '../../types';
import { mockAnalysisResult, mockResources } from '../../utils/mockData';

export default function MainLayout() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [resources, setResources] = useState<TeachingResource[]>([]);
  const [selectedResource, setSelectedResource] = useState<TeachingResource | null>(null);
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async (
    content: string,
    method: InputMethod,
    file?: File,
    url?: string
  ) => {
    setIsAnalyzing(true);
    
    // 模拟API调用延迟
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // 使用模拟数据
    setAnalysisResult(mockAnalysisResult);
    setResources(mockResources);
    setIsAnalyzing(false);
  };

  const handleDownload = (resource: TeachingResource) => {
    console.log('下载资源:', resource);
    alert(`准备下载: ${resource.title}`);
  };

  const handleSubmitEvaluation = (resourceId: string, rating: number, comment?: string) => {
    const newEvaluation: Evaluation = {
      resourceId,
      rating,
      comment,
      timestamp: Date.now(),
    };
    setEvaluations([...evaluations, newEvaluation]);
    alert('评估提交成功！');
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* 头部 */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">教学辅助系统</h1>
        <p className="text-sm text-gray-600 mt-1">智能教学方案分析与资源管理</p>
      </header>

      {/* 主内容区 - 三栏布局 */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full grid grid-cols-12 gap-4 p-4">
          {/* 左侧栏 - 板块一：教学方案输入 */}
          <div className="col-span-12 lg:col-span-3 h-full animate-fade-in">
            <TeachingPlanInput onSubmit={handleSubmit} isLoading={isAnalyzing} />
          </div>

          {/* 中间栏 - 板块二：分析结果与资源展示 */}
          <div className="col-span-12 lg:col-span-6 h-full flex flex-col gap-4">
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-4 overflow-hidden animate-fade-in">
              <AnalysisDisplay analysisResult={analysisResult} isLoading={isAnalyzing} />
            </div>
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-4 overflow-hidden animate-fade-in">
              <ResourceList 
                resources={resources} 
                onDownload={handleDownload}
                onSelect={setSelectedResource}
                selectedResourceId={selectedResource?.id}
              />
            </div>
          </div>

          {/* 右侧栏 - 板块三：资源评估 */}
          <div className="col-span-12 lg:col-span-3 h-full animate-fade-in">
            <EvaluationPanel
              selectedResource={selectedResource}
              evaluations={evaluations}
              onSubmitEvaluation={handleSubmitEvaluation}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
