
interface StatisticInfo{
    thisMonth: number,
    lastMonth: number,
    change: number
}

export interface TaskStatistics{
    created: StatisticInfo,
    completed: StatisticInfo,
    pending: StatisticInfo
}