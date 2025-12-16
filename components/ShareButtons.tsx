"use client";

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  } from 'react-share';
import { XIcon } from './XIcon';
import { X } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  slug: string;
}

const URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

/**
 * A component that renders social media share buttons.
 */
export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const shareUrl = `${URL}/blog/${slug}`;

  return (
    <div className="flex items-center space-x-4 mt-8">
      <span className="text-text/80">Share this post:</span>
      <TwitterShareButton url={shareUrl} title={title}>
        <XIcon size={25} />
      </TwitterShareButton>
      <FacebookShareButton url={shareUrl} title={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <LinkedinShareButton url={shareUrl} title={title}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <WhatsappShareButton url={shareUrl} title={title}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </div>
  );
}
