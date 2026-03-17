import { AnalysisResult } from '../../types';
import { FiCheckCircle, FiLightbulb } from 'react-icons/fi';

interface AnalysisDisplayProps {
  analysisResult: AnalysisResult | null;
  isLoading?: boolean;
}

export default function AnalysisDisplay({ analysisResult, isLoading }: AnalysisDisplayProps) {
  if (isLoading) {
    return (
      <div className="h-full flex flex-col">
        <h3 className="font-semibold text-gray-800 mb-4">分析结果</h3>
        <div className="flex-1 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!analysisResult) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-400 py-12">
        <FiLightbulb className="text-4xl mb-2" />
        <p>等待分析结果...</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <h3 className="font-semibold text-gray-800 mb-4">分析结果</h3>
      
      <div className="flex-1 overflow-y-auto space-y-6">
        {/* 总结 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-2 mb-2">
            <FiLightbulb className="text-blue-600 text-xl flex-shrink-0 mt-0.5" />
            <h4 className="font-semibold text-blue-900">分析总结</h4>
          </div>
          <p className="text-blue-800 text-sm leading-relaxed">{analysisResult.summary}</p>
        </div>

        {/* 关键点 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FiCheckCircle className="text-green-600" />
            <h4 className="font-semibold text-gray-800">关键要点</h4>
          </div>
          <ul className="space-y-2">
            {analysisResult.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-1">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 建议 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FiLightbulb className="text-yellow-600" />
            <h4 className="font-semibold text-gray-800">改进建议</h4>
          </div>
          <ul className="space-y-2">
            {analysisResult.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-yellow-500 mt-1">→</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
