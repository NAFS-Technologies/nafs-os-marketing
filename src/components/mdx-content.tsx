import type { JSX } from 'react'

import { MDXRemote } from 'next-mdx-remote-client/rsc'
import type { MDXRemoteProps } from 'next-mdx-remote-client/rsc'

const components: MDXRemoteProps['components'] = {
  h1: ({ children }) => <h2>{children}</h2>,
  h2: ({ children }) => <h2>{children}</h2>,
  h3: ({ children }) => <h3>{children}</h3>,
  h4: ({ children }) => <h4>{children}</h4>,
  p: ({ children }) => <p>{children}</p>,
  ul: ({ children }) => <ul>{children}</ul>,
  ol: ({ children }) => <ol>{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
  blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  code: ({ children }) => <code>{children}</code>,
  pre: ({ children }) => <pre>{children}</pre>,
  strong: ({ children }) => <strong>{children}</strong>,
  a: ({ children, href }) => <a href={typeof href === 'string' && (/^(https?:|mailto:|#)/.test(href) || (href.startsWith('/') && !href.startsWith('//'))) ? href : undefined}>{children}</a>,
  hr: () => <hr />,
  img: ({ src, alt }) => <img src={src} alt={alt ?? ''} loading='lazy' decoding='async' />,
  table: ({ children }) => <div className='m-article-table'><table>{children}</table></div>
}

export default function MDXContent(props: JSX.IntrinsicAttributes & MDXRemoteProps) {
  return <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />
}
