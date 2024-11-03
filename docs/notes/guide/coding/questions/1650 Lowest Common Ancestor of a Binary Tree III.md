---
title: 1650 Lowest Common Ancestor of a Binary Tree III
createTime: 2024/10/17 17:34:44
permalink: /guide/coding/questions/1650/
---

::: note [Question]
[Leetcode Link](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iii/description/?envType=company&envId=amazon&favoriteSlug=amazon-thirty-days)

:::
:::: details Solution
There are several things to note:

::: code-tabs
@tab java

```java
public Node lowestCommonAncestor(Node p, Node q) {
    Set<Integer> set = new HashSet<>();
    while (true) {
        if (p != null) {
            if (set.contains(p.val)) return p;
            set.add(p.val);
            p = p.parent;
        }
        if (q != null) {
            if (set.contains(q.val)) return q;
            set.add(q.val);
            q = q.parent;
        }
    }
}
```

:::
::::
