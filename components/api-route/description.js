import Markdown from 'markdown-to-jsx'

export default ({
  data,
}) => {
  const {
    description,
  } = { ...data }

  return (
    <div className="text-slate-500 dark:text-slate-500 mx-1">
      <Markdown
        children={description}
      />
    </div>
  )
}