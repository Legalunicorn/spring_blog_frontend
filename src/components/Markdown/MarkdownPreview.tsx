import Markdown from "react-markdown";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { xonokai } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./markdownPreview.scss"


type PreviewProps = {
    body:string,
    extra_class?: string
}

const MarkdownPreview = ({body,extra_class=""}:PreviewProps) => {
    return (
        <Markdown
            children={body}
            className={extra_class+" preview-markdown"}
            components ={{
                code(props){
                    const {children,className,node,...rest} = props;
                    const match = /language-(\w+)/.exec(className || '')
                    return match? (
                        <SyntaxHighlighter
                            showLineNumbers={true}
                            style={xonokai}
                            PreTag="div"
                            children={String(children).replace(/\n$/,"")}
                            language={match[1]}
                        />
                    ) : (
                        <code {...rest} className={`${className} no-lang`}>
                            {children}
                        </code>
                    )
                }
            }}
        />
    );
}
 
export default MarkdownPreview;