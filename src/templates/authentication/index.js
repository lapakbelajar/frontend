import style from './style/Authentication.module.css'

export default function Authentication({children}){
    return (
        <div className={style.container}>
            <div className={style.canvas}>
               {children}
            </div>
        </div>  
    )
}