"use client";

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';

interface ShareButtonsProps {
  title: string;
  slug: string;
}

const URL = 'https://digitaldrift.com';

/**
 * A component that renders social media share buttons.
 */
export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const shareUrl = `${URL}/blog/${slug}`;

  return (
    <div className="flex items-center space-x-4 mt-8">
      <span className="text-text/80">Share this post:</span>
      <TwitterShareButton url={shareUrl} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <FacebookShareButton url={shareUrl} quote={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <LinkedinShareButton url={shareUrl} title={title}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>
  );
}
