---
title: 437 Path Sum III
createTime: 2024/10/15 12:59:33
permalink: /guide/coding/questions/437/
tags:
  - Amazon
---

::: note Question
[Leetcode Link](https://leetcode.com/problems/path-sum-iii/description/?envType=company&envId=amazon&favoriteSlug=amazon-thirty-days)

Given the root of a binary tree and an integer targetSum, return the number of paths where the sum of the values along the path equals targetSum.

The path does not need to start or end at the root or a leaf, but it must go downwards (i.e., traveling only from parent nodes to child nodes).

<img src="/images/coding/questions/437-PathSum3.png">

:::

:::: details Solution
There are several things to note:

==DFS method:==
::: code-tabs
@tab java

```java

public int pathSum(TreeNode root, int targetSum) {
    if (root == null) return 0;
    int result = dfs(root, targetSum);
    result += pathSum(root.left, targetSum);
    result += pathSum(root.right, targetSum);
    return result;
}

private int dfs(TreeNode root, long targetSum) {
    if (root == null) return 0;
    int result = 0;
    if (root.val == targetSum) result++;
    result += dfs(root.left, targetSum - root.val);
    result += dfs(root.right, targetSum - root.val);
    return result;
}
```

:::
==Prefix sum method:==
::: code-tabs
@tab java

```java
Map<Long, Integer> map = new HashMap<>();

public int pathSum(TreeNode root, int targetSum) {
    map.put(0L, 1);
    return dfs(root, 0, targetSum);
}

private int dfs(TreeNode root, long cur, long targetSum) {
    if (root == null) return 0;
    int result = 0;
    cur += root.val;
    result += map.getOrDefault(cur - targetSum, 0);
    map.put(cur, map.getOrDefault(cur, 0) + 1);
    result += dfs(root.left, cur, targetSum);
    result += dfs(root.right, cur, targetSum);
    map.put(cur, map.get(cur) - 1);
    return result;
}



```

::::
