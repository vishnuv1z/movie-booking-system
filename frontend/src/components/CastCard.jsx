export default function CastCard({ person }) {
  const { name, role, image } = person;

  return (
    <div className="flex flex-col items-center gap-2.5 flex-shrink-0 w-28 group cursor-pointer">
      {/* Round Profile Image */}
      <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-600 group-hover:ring-primary transition-all duration-300 shadow-md group-hover:shadow-lg group-hover:shadow-primary/20">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 rounded-full" />
      </div>

      {/* Name */}
      <p className="text-sm font-semibold text-gray-900 dark:text-white text-center leading-tight line-clamp-1 group-hover:text-primary transition-colors duration-200">
        {name}
      </p>

      {/* Role Badge */}
      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/60 px-2.5 py-0.5 rounded-full">
        {role}
      </span>
    </div>
  );
}
