---
title: 179 Largest Number
createTime: 2024/10/14 15:26:31
permalink: /guide/questions/179/
tags:
  - Amazon
---

::: note [Question]
[Leetcode Link](https://leetcode.com/problems/largest-number/description/?envType=company&envId=amazon&favoriteSlug=amazon-thirty-days)

Given a list of non-negative integers `nums`, arrange them such that they form the largest number and return it.

Since the result may be very large, so you need to return a string instead of an integer.

_Example 1:_

> _Input_: nums = [10,2] > _Output_: "210"

_Example 2:_

> _Input_: nums = [3,30,34,5,9] > _Output_: "9534330"

_Constraints:_

- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 109`

:::
::: details Solution
There are several things to note:

```java
public String largestNumber(int[] nums) {
    PriorityQueue<String> pq = new PriorityQueue<>((o1, o2) -> (o2 + o1).compareTo(o1 + o2));
    for (int num : nums) {
        pq.add(String.valueOf(num));
    }
    StringBuilder sb = new StringBuilder();
    while (!pq.isEmpty()) {
        sb.append(pq.poll());
    }
    while (sb.charAt(0) == '0' && sb.length() > 1) sb.deleteCharAt(0);
    return sb.toString();
}
```

:::
