import React, {useState} from 'react'
import styles from '../../common/pagination/Paginator.module.css';
import cn from 'classnames'
let Paginator = ({totalUsersCount,pageSize,currentPage,onPageChanged,portionSize = 10}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize) // 3
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1  //1
    let rightPortionPageNumber = portionNumber * portionSize // 10

    return <div className={styles.paginator}>
        {portionNumber > 1 && <button onClick={() => setPortionNumber(portionNumber - 1)}>PreviosState</button>}
            {pages
                .filter(p => p >= leftPortionPageNumber && p<=rightPortionPageNumber)
                .map(p => {
                    // {currentPage === p && styles.selectedPage}
                return <span className={cn({
                        [styles.selectedPage] :currentPage === p},
                            styles.pageNumber)}
                             onClick={(e) => {
                                 onPageChanged(p)
                             }}>{p}</span>
            })}

        {portionCount > portionNumber && <button onClick={() => setPortionNumber(portionNumber + 1)}>NextState</button>}
    </div>

}

export default Paginator