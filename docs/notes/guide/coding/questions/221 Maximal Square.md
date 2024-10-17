---
title: 221 Maximal Square
createTime: 2024/10/16 19:56:53
permalink: /guide/coding/questions/221/
tags:
  - Amazon
---

::: note [Question]
[Leetcode Link](https://leetcode.com/problems/maximal-square/description/?envType=company&envId=amazon&favoriteSlug=amazon-thirty-days)
:::
:::: details Solution
There are several things to note:

::: code-tabs
@tab java

```java
public int maximalSquare(char[][] matrix) {
    int m = matrix.length;
    int n = matrix[0].length;
    int[][] dp = new int[m][n];
    int result = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (matrix[i][j] == '1') {
                if (i == 0 || j == 0) dp[i][j] = 1;
                else {
                    int min = Math.min(dp[i - 1][j - 1], dp[i - 1][j]);
                    dp[i][j] = Math.min(min, dp[i][j - 1]) + 1;
                }
                result = Math.max(result, dp[i][j]);
            }
        }
    }
    return result * result;
}
```

::::
