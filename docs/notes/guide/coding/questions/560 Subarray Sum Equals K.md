---
title: 560 Subarray Sum Equals K
createTime: 2024/10/14 21:10:39
permalink: /guide/coding/questions/560/
tags:
  - Amazon
---

::: note Question
[Leetcode Link](https://leetcode.com/problems/subarray-sum-equals-k/description/?envType=company&envId=amazon&favoriteSlug=amazon-thirty-days)

:::

:::: details Solution
There are several things to note:

==Prefix sum + HashMap:==
::: code-tabs
@tab java

```java
public int subarraySum(int[] nums, int k) {
    int count = 0, sum = 0;
    HashMap<Integer, Integer> mp = new HashMap<>();
    mp.put(0, 1);
    for (int i = 0; i < nums.length; i++) {
        sum += nums[i];
        if (mp.containsKey(sum - k)) {
            count += mp.get(sum - k);
        }
        mp.put(sum, mp.getOrDefault(sum, 0) + 1);
    }
    return count;
}

```

::::
