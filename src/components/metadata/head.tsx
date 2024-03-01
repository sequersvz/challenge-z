import Head from 'next/head'

interface IProps {
  title?: string
}

export const AppHead: React.FC<IProps> = ({ title = 'Marvel Superheros' }: IProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel='icon' href='/public/favicon.ico' />
    </Head>
  )
}
