---
title: 253 Meeting Rooms II
createTime: 2024/10/17 14:04:31
permalink: /guide/coding/questions/253/
---

::: note [Question]
[Leetcode Link](https://leetcode.com/problems/meeting-rooms-ii/description/?envType=company&envId=amazon&favoriteSlug=amazon-thirty-days)
:::
:::: details Solution
There are several things to note:

::: code-tabs
@tab java

```java
public int minMeetingRooms(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
    PriorityQueue<Integer> pq = new PriorityQueue<>();
    int result = 0;
    for (int[] interval : intervals) {
        if (pq.isEmpty()) {
            pq.add(interval[1]);
        } else {
            while (!pq.isEmpty() && interval[0] >= pq.peek()) {
                pq.poll();
            }
            pq.add(interval[1]);
        }
        result = Math.max(result, pq.size());
    }
    return result;
}
```

::::
