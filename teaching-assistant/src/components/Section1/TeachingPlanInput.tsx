import { useState } from 'react';
import { InputMethod } from '../../types';
import InputTabs from './InputTabs';
import FileUpload from './FileUpload';
import { FiSend } from 'react-icons/fi';

interface TeachingPlanInputProps {
  onSubmit: (content: string, method: InputMethod, file?: File, url?: string) => void;
  isLoading?: boolean;
}

const templates = [
  { id: '1', name: '计算机科学基础课程模板' },
  { id: '2', name: '编程实践课程模板' },
  { id: '3', name: '理论课程模板' },
];

export default function TeachingPlanInput({ onSubmit, isLoading = false }: TeachingPlanInputProps) {
  const [inputMethod, setInputMethod] = useState<InputMethod>('text');
  const [textContent, setTextContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [url, setUrl] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const handleSubmit = () => {
    try {
      if (inputMethod === 'text' && !textContent.trim()) {
        throw new Error('请输入教学方案内容');
      }
      if (inputMethod === 'file' && !selectedFile) {
        throw new Error('请选择要上传的文件');
      }
      if (inputMethod === 'url' && !url.trim()) {
        throw new Error('请输入URL地址');
      }
      if (inputMethod === 'url' && !/^https?:\/\/.+/.test(url)) {
        throw new Error('请输入有效的URL地址（以http://或https://开头）');
      }
      if (inputMethod === 'template' && !selectedTemplate) {
        throw new Error('请选择一个模板');
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
      return;
    }

    let content = '';
    if (inputMethod === 'text') {
      content = textContent;
    } else if (inputMethod === 'file') {
      content = selectedFile?.name || '';
    } else if (inputMethod === 'url') {
      content = url;
    } else if (inputMethod === 'template') {
      content = `模板ID: ${selectedTemplate}`;
    }

    onSubmit(content, inputMethod, selectedFile || undefined, url || undefined);
  };

  const handleFileRead = async (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.onerror = reject;
      if (file.type.includes('text')) {
        reader.readAsText(file);
      } else {
        reader.readAsDataURL(file);
      }
    });
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">教学方案输入</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <InputTabs activeMethod={inputMethod} onMethodChange={setInputMethod} />

        <div className="mt-4">
          {inputMethod === 'text' && (
            <div>
              <textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="请输入教学方案内容..."
                className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={10}
              />
              <div className="mt-2 text-sm text-gray-500 text-right">
                字符数: {textContent.length}
              </div>
            </div>
          )}

          {inputMethod === 'file' && (
            <FileUpload
              onFileSelect={(file) => setSelectedFile(file)}
              acceptedTypes={['.doc', '.docx', '.pdf', '.txt', '.md']}
            />
          )}

          {inputMethod === 'url' && (
            <div>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="请输入教学方案的URL地址..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="mt-2 text-sm text-gray-500">
                支持从网页链接导入教学方案内容
              </p>
            </div>
          )}

          {inputMethod === 'template' && (
            <div>
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">请选择模板</option>
                {templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
              {selectedTemplate && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    已选择模板：{templates.find(t => t.id === selectedTemplate)?.name}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`
            w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium
            transition-all duration-200
            ${
              isLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
            }
          `}
        >
          <FiSend className="text-lg" />
          {isLoading ? '分析中...' : '提交分析'}
        </button>
      </div>
    </div>
  );
}
