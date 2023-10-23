const ErrorMessage = ({ errorText }: { errorText: string }) => {
  return (
    <div className="mx-auto max-w-max flex justify-center items-center h-[200px] my-[173.5px] text-xl bg-white text-red-800 font-bold px-8">
      <p>{errorText}</p>
    </div>
  )
}

export default ErrorMessage
