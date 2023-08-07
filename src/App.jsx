import React, { useEffect, useState } from 'react';
import { Loader } from './Loader/Loader';
import './App.css';
import { FaFreeCodeCamp, FaArrowsAlt, FaCompress } from 'react-icons/fa';
import { marked } from 'marked';

const INITIAL = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\\\`\\\`\\\`' && lastLine == '\\\`\\\`\\\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**...whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

| Wild Header | Crazy Header | Another Header? |
| ------------ | ------------- | ------------- |
| Your content can | be here, and it | can be here.... |
| And here. | Okay. | I think we get it. |

- And of course, there are lists.
  - Some are bulleted.
    - With different indentation levels.
      - That look like this.

1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

export const App = () => {
  const [isLoading, setIsLoading] = useState(false); 
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [input, setInput] = useState(INITIAL); 
  const [isEditorMaximized, setIsEditorMaximized] = useState(false);
  const [isPreviewMaximized, setIsPreviewMaximized] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, []); 

  useEffect(() => {
    if (!input) {
      setIsError(true);
      setErrorMessage('Oops... Something went wrong...');
    } else {
      setIsError(false);
    }
  }, [input]);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const convertToHTML = (markdownText) => {
    return marked(markdownText, { breaks: true });
  };

  const toggleEditorMaximized = () => {
    setIsEditorMaximized((prev) => !prev);
    setIsPreviewMaximized(false);
  };

  const togglePreviewMaximized = () => {
    setIsPreviewMaximized((prev) => !prev);
    setIsEditorMaximized(false);
  };

  return (
    <>
      {isLoading && <Loader />}

      {isError && (
        <p className="error-message">
          {errorMessage}
        </p>
      )}

      {!isLoading && !isError && (
        <div
          className="App"
          id="app"
        >
          <div className={`editorWrap ${isEditorMaximized ? 'maximized' : ''} ${isPreviewMaximized ? 'hide' : ''}`}>
            <div className="toolbar">
              <FaFreeCodeCamp className="icon fa-free-code-camp" />
              Editor
              {!isEditorMaximized ? (
                <FaArrowsAlt
                  className="icon fa-arrows-alt"
                  onClick={toggleEditorMaximized}
                />
              ) : (
                <FaCompress
                  className="icon fa-compress"
                  onClick={toggleEditorMaximized}
                />
              )}
            </div>

            <textarea
              id="editor"
              value={input}
              onChange={handleChange}
            />
          </div>

          <div className={`previewWrap ${isPreviewMaximized ? 'maximized' : ''} ${isEditorMaximized ? 'hide' : ''}`}>
            <div className="toolbar">
              <FaFreeCodeCamp className="icon fa-free-code-camp" />
              Previewer
              {!isPreviewMaximized ? (
                <FaArrowsAlt
                  className="icon fa-arrows-alt"
                  onClick={togglePreviewMaximized}
                />
              ) : (
                <FaCompress
                  className="icon fa-compress"
                  onClick={togglePreviewMaximized}
                />
              )}
            </div>

            <div
              className="preview"
              id="preview"
              dangerouslySetInnerHTML={{ __html: convertToHTML(input) }}
            />
          </div>
        </div>
      )}
    </>
  );
};
