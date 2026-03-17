import { useState } from 'react';
import { FiStar } from 'react-icons/fi';

interface RatingComponentProps {
  value: number;
  onChange: (rating: number) => void;
  maxRating?: number;
  readonly?: boolean;
}

export default function RatingComponent({
  value,
  onChange,
  maxRating = 5,
  readonly = false,
}: RatingComponentProps) {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleClick = (rating: number) => {
    if (!readonly) {
      onChange(rating);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }, (_, i) => i + 1).map((rating) => {
        const isActive = rating <= (hoveredRating || value);
        return (
          <button
            key={rating}
            type="button"
            onClick={() => handleClick(rating)}
            onMouseEnter={() => !readonly && setHoveredRating(rating)}
            onMouseLeave={() => !readonly && setHoveredRating(0)}
            disabled={readonly}
            className={`
              transition-all duration-150
              ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}
              ${isActive ? 'text-yellow-400' : 'text-gray-300'}
            `}
            aria-label={`评分 ${rating} 星`}
          >
            <FiStar
              className={`text-2xl ${isActive ? 'fill-current' : ''}`}
            />
          </button>
        );
      })}
      {value > 0 && (
        <span className="ml-2 text-sm text-gray-600 font-medium">
          {value} / {maxRating}
        </span>
      )}
    </div>
  );
}
