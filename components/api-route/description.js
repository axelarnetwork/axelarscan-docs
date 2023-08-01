import Markdown from 'markdown-to-jsx'

export default ({ data }) => {
  const { description } = { ...data }
  return (
    <div className="text-slate-400 dark:text-slate-500 mx-1">
      {description && <Markdown children={description} />}
    </div>
  )
}