import { useEffect } from 'react'
import CacheManager from '../components/CacheManager'
import './About.css'

const About = () => {
    useEffect(() => {
        document.title = 'О проекте | Страны мира'
    }, [])

    return (
        <div className="row">
            <div className="col-md-12">
                <h1>О проекте</h1>
                <p>
                    Этот сайт предназначен как простой и удобный способ изучить информацию о
                    странах и регионах мира.
                </p>

                <h2>Возможности</h2>
                <p>
                    <strong>Поиск:</strong> Быстрый поиск стран по названию на главной странице.
                </p>
                <p>
                    <strong>Детальная информация:</strong> Названия, коды, языки, география, флаги и карты.
                </p>
                <p>
                    <strong>Темная и светлая темы:</strong> Переключайтесь между темами с помощью кнопки в правом нижнем углу.
                </p>
                <p>
                    <strong>Кэширование:</strong> Данные кэшируются для быстрой загрузки при повторных посещениях.
                </p>

                <h2>Технологии</h2>
                <p>
                    Приложение создано с использованием <strong>React</strong>, <strong>Vite</strong>,
                    <strong>React Router</strong> и современных CSS технологий.
                </p>

                <CacheManager />

                <h2>Контакты</h2>
                <p>
                    Если у вас есть вопросы или предложения, свяжитесь с разработчиком.
                </p>
            </div>
        </div>
    )
}

export default About

