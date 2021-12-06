import style from "./Profile.module.css";

export default function Profile({ image, name, education, skils }) {
  return (
    <div className={style.profile}>
      <img src={image} alt={name} />
      <div className={style.profile_desc}>
        <span>{name}</span>
        <small>
          {education} - {skils}
        </small>
      </div>
    </div>
  );
}
