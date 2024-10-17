---
title: 207. Course Schedule
createTime: 2024/10/13 19:53:12
permalink: /guide/coding/questions/207/
tags:
  - Amazon
---


::: note [Question]
[Leetcode Link](https://leetcode.com/problems/course-schedule/description/?envType=company&envId=amazon&favoriteSlug=amazon-thirty-days)

There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a_i, b_i]` indicates that you must take course `b_i` first if you want to take course `a_i`.

For example, the pair `[0, 1]`, indicates that to take course `0` you have to first take course `1`.
Return `true` if you can finish all courses. Otherwise, return `false`.

**Example 1:**

>**Input**: numCourses = 2, prerequisites = [[1,0]]
>
>**Output**: true
>
>**Explanation**: There are a total of 2 courses to take. 
>
>To take course 1 you should have finished course 0. So it is possible.

**Example 2:**

>**Input**: numCourses = 2, prerequisites = [[1,0],[0,1]]
>
>**Output**: false
>
>**Explanation**: There are a total of 2 courses to take. 

To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.

**Constraints:**

+ `1 <= numCourses <= 2000`
+ `0 <= prerequisites.length <= 5000`
+ `prerequisites[i].length == 2`
+ `0 <= ai, bi < numCourses`
+ All the pairs prerequisites[i] are **unique**.
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