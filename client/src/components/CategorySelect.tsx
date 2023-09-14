export const CategorySelect = ({
  onChange,
  className = '',
  value,
  hasAllOption = false,
}: {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  value: string;
  className?: string;
  hasAllOption?: boolean;
}) => {
  return (
    <select
      className={`form-select ${className}`}
      aria-label="Default select example"
      onChange={onChange}
      value={value}
    >
      <option selected disabled>
        Selected business category
      </option>
      <option value="dining">Dining</option>
      <option value="construction">Construction</option>
      <option value="electronics">Electronics</option>
      <option value="leisure">Leisure</option>
      <option value="flowers">Flowers</option>
      {hasAllOption && <option value="">All</option>}
    </select>
  );
};
