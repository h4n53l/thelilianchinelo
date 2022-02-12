import moment from 'moment'
import { Fragment, Key, ReactChild, ReactFragment, ReactPortal } from 'react';
import { Post } from '../types';

const PostDetail = ({ post }: {post: any}) => {

    const getContentFragment = (index: any, text: any, obj: any, type?: any) => {
        let modifiedText = text;
    
        if (obj) {
          if (obj.bold) {
            modifiedText = (<b key={index}>{text}</b>);
          }
    
          if (obj.italic) {
            modifiedText = (<em key={index}>{text}</em>);
          }
    
          if (obj.underline) {
            modifiedText = (<u key={index}>{text}</u>);
          }
        }
    
        switch (type) {
          case 'heading-three':
            return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined, i: Key | null | undefined) => <Fragment key={i}>{item}</Fragment>)}</h3>;
          case 'paragraph':
            return <p key={index} className="mb-8">{modifiedText.map((item: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined, i: Key | null | undefined) => <Fragment key={i}>{item}</Fragment>)}</p>;
          case 'heading-four':
            return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined, i: Key | null | undefined) => <Fragment key={i}>{item}</Fragment>)}</h4>;
          case 'image':
            return (
              <img
                key={index}
                alt={obj.title}
                height={obj.height}
                width={obj.width}
                src={obj.src}
              />
            );
          default:
            return modifiedText;
        }
      };

  return (
    <div className="mb-8 bg-white pb-12 shadow-lg lg:p-8">
      <div className="relative mb-6 overflow-hidden shadow-md">
        <img
          className="h-full w-full rounded-t-lg object-top"
          src={post.featuredImage.url}
          alt={post.title}
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="mb-8 flex w-full items-center">
          <div className="mr-8 mb-4 flex w-full items-center lg:mb-0 lg:w-auto">
            <img
              className="rounded-full align-middle"
              src={post.author.photo.url}
              alt={post.author.name}
              height="30px"
              width="50px"
            />
            <p className="ml-2 inline align-middle text-lg text-gray-700">
              {post.author.name}
            </p>
          </div>
          <div className="font-medium text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 inline h-6 w-6 text-pink-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="align-middle">
              {moment(post.createdAt).format('DD-MMM-YYYY')}
            </span>
          </div>
        </div>
      </div>
      <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
          {post.content.raw.children.map((typeObj: { children: any[]; type: any; }, index: any) => {
            const children = typeObj.children.map((item, itemIndex) => getContentFragment(itemIndex, item.text, item));

            return getContentFragment(index, children, typeObj, typeObj.type);
          })}
    </div>
  )
}

export default PostDetail
