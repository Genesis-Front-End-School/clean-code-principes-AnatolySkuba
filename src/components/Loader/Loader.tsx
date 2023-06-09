export const Loader = () => {
  let circleCommonClasses = 'h-2.5 w-2.5 bg-green-600 rounded-full';

  return (
    <div className="flex justify-center h-screen items-center">
      <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
      <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
      <div className={`${circleCommonClasses} animate-bounce400`}></div>
    </div>
  );
};
