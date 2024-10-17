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

1. This is a typical DFS (Depth-First Search) problem. We can use a graph to represent the relationships between prerequisites and traverse the nodes to check if we encounter the root again. If the root is visited again during the traversal, it indicates a cycle, meaning the requirements cannot be fulfilled.
2. Use different numbers to indicate whether a node has been visited or not.
   ::: code-tabs
   @tab java

```java
boolean res = true;
List<List<Integer>> graph;
int[] visited;

public boolean canFinish(int numCourses, int[][] prerequisites) {
    graph = new ArrayList<>();
    visited = new int[numCourses];
    for (int i = 0; i < numCourses; i++) {
        graph.add(new ArrayList<>());
    }
    for (int[] prerequisite : prerequisites) {
        graph.get(prerequisite[1]).add(prerequisite[0]);
    }
    for (int i = 0; i < numCourses && res; i++) {
        if (visited[i] == 0) {
            dfs(i);
        }
    }
    return res;
}

private void dfs(int i) {
    visited[i] = 1;
    for (int j : graph.get(i)) {
        if (visited[j] == 0) {
            dfs(j);
            if (!res) {
                return;
            }
        } else if (visited[j] == 1) {
            res = false;
            return;
        }
    }
    visited[i] = 2;
}
```

:::
