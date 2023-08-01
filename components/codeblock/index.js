import SyntaxHighlighter from 'react-syntax-highlighter'

export default ({ language, children }) => {
  return (
    <SyntaxHighlighter language={language} className="code-block max-h-screen overflow-y-auto">
      {typeof children === 'string' ? children.replace(/\\/g, '\\\n') : children}
    </SyntaxHighlighter>
  )
}