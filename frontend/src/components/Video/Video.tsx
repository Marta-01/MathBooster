interface LoginFormProps {
  url: string;
  onChangeClick: () => void;
}

export const Video: React.FC<LoginFormProps> = ({ url, onChangeClick }) => {
  return (
    <>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${url.split('v=')[1]}`}
        title="Math tutorial video"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <button onClick={onChangeClick}>Take the quiz</button>
    </>
  );
};
