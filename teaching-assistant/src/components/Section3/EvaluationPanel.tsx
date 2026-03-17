import { useState, useEffect } from 'react';
import { TeachingResource, Evaluation, EvaluationStats } from '../../types';
import RatingComponent from './RatingComponent';
import { FiStar, FiMessageSquare, FiClock } from 'react-icons/fi';

interface EvaluationPanelProps {
  selectedResource: TeachingResource | null;
  evaluations: Evaluation[];
  onSubmitEvaluation: (resourceId: string, rating: number, comment?: string) => void;
}

export default function EvaluationPanel({
  selectedResource,
  evaluations,
  onSubmitEvaluation,
}: EvaluationPanelProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [resourceEvaluations, setResourceEvaluations] = useState<Evaluation[]>([]);
  const [stats, setStats] = useState<EvaluationStats | null>(null);

  useEffect(() => {
    if (selectedResource) {
      const resourceEvals = evaluations.filter(
        (e) => e.resourceId === selectedResource.id
      );
      setResourceEvaluations(resourceEvals);
      
      if (resourceEvals.length > 0) {
        const avgRating =
          resourceEvals.reduce((sum, e) => sum + e.rating, 0) / resourceEvals.length;
        setStats({
          averageRating: avgRating,
          totalEvaluations: resourceEvals.length,
        });
      } else {
        setStats(null);
      }
      
      // 重置表单
      setRating(0);
      setComment('');
    }
  }, [selectedResource, evaluations]);

  const handleSubmit = () => {
    if (!selectedResource) return;
    if (rating === 0) {
      alert('请选择评分');
      return;
    }
    onSubmitEvaluation(selectedResource.id, rating, comment.trim() || undefined);
    setRating(0);
    setComment('');
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!selectedResource) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-400 py-12">
        <FiStar className="text-4xl mb-2" />
        <p>请选择一个资源进行评估</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">资源评估</h2>
        <p className="text-sm text-gray-600 mt-1 truncate">{selectedResource.title}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* 评估统计 */}
        {stats && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">平均评分</span>
              <span className="text-2xl font-bold text-blue-600">
                {stats.averageRating.toFixed(1)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <FiStar className="text-yellow-400" />
              <span>共 {stats.totalEvaluations} 条评估</span>
            </div>
          </div>
        )}

        {/* 评分输入 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            您的评分
          </label>
          <RatingComponent value={rating} onChange={setRating} />
        </div>

        {/* 评论输入 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FiMessageSquare className="inline mr-1" />
            评论（可选）
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="请输入您的评价..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
          />
        </div>

        {/* 提交按钮 */}
        <button
          onClick={handleSubmit}
          disabled={rating === 0}
          className={`
            w-full px-4 py-2.5 rounded-lg font-medium transition-all duration-200
            ${
              rating === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
            }
          `}
        >
          提交评估
        </button>

        {/* 评估历史 */}
        {resourceEvaluations.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FiClock />
              评估历史
            </h3>
            <div className="space-y-3">
              {resourceEvaluations.map((evalItem, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-3 bg-gray-50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <RatingComponent
                      value={evalItem.rating}
                      onChange={() => {}}
                      readonly
                    />
                    <span className="text-xs text-gray-500">
                      {formatDate(evalItem.timestamp)}
                    </span>
                  </div>
                  {evalItem.comment && (
                    <p className="text-sm text-gray-700 mt-2">{evalItem.comment}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
