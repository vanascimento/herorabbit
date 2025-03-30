type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  className?: string;
};

export default function SafeImage({ className, src, ...props }: ImageProps) {
  return (
    <img
      className={`ext-safe-image ${className}`}
      {...props}
      src={chrome?.runtime ? chrome.runtime.getURL(src as string) : src}
    />
  );
}
