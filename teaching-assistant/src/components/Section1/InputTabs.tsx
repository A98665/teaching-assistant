import { InputMethod } from '../../types';

interface InputTabsProps {
  activeMethod: InputMethod;
  onMethodChange: (method: InputMethod) => void;
}

const inputMethods: { id: InputMethod; label: string; icon: string }[] = [
  { id: 'text', label: '文本输入', icon: '📝' },
  { id: 'file', label: '文件上传', icon: '📄' },
  { id: 'url', label: 'URL导入', icon: '🔗' },
  { id: 'template', label: '模板选择', icon: '📋' },
];

export default function InputTabs({ activeMethod, onMethodChange }: InputTabsProps) {
  return (
    <div className="flex gap-2 mb-4 border-b border-gray-200">
      {inputMethods.map((method) => (
        <button
          key={method.id}
          onClick={() => onMethodChange(method.id)}
          className={`
            px-4 py-2 text-sm font-medium transition-all duration-200
            border-b-2 -mb-px
            ${
              activeMethod === method.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }
          `}
        >
          <span className="mr-2">{method.icon}</span>
          {method.label}
        </button>
      ))}
    </div>
  );
}
