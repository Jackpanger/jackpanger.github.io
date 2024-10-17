---
title: 14. Longest Common Prefix
createTime: 2024/10/14 15:49:58
permalink: /guide/questions/14/
---

::: note Question
[Leetcode Link](https://leetcode.com/problems/longest-common-prefix/description/?envType=company&envId=amazon&favoriteSlug=amazon-thirty-days)

:::

:::: details Solution
There are several things to note:

==Normal method:==
::: code-tabs
@tab java

```java

public String longestCommonPrefix(String[] strs) {
    StringBuilder sb = new StringBuilder();
    String min = "";
    int size = Integer.MAX_VALUE;
    for (int i = 0; i < strs.length; i++) {
        if (strs[i].length() < size) {
            size = strs[i].length();
            min = strs[i];
        }
    }
    for (int i = 0; i < size; i++) {
        for (int j = 0; j < strs.length; j++) {
            if (strs[j].charAt(i)!=min.charAt(i)) return sb.toString();
        }
        sb.append(min.charAt(i));
    }
    return sb.toString();
}
```

:::
==Sort String:==
::: code-tabs
@tab java

```java
public String longestCommonPrefix(String[] strs) {
    Arrays.sort(strs);
    StringBuilder sb = new StringBuilder();
    int last = strs.length - 1;
    for (int i = 0; i < Math.min(strs[0].length(), strs[last].length()); i++) {
        if (strs[0].charAt(i) != strs[last].charAt(i)) return sb.toString();
        sb.append(strs[0].charAt(i));
    }
    return sb.toString();
}

```

::::
