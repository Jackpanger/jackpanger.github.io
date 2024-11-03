---
title: 863 All Nodes Distance K in Binary Tree
createTime: 2024/10/17 15:10:05
permalink: /guide/coding/questions/863/
---

::: note [Question]
[Leetcode Link](https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/description/?envType=company&envId=amazon&favoriteSlug=amazon-thirty-days)

:::
:::: details Solution
There are several things to note:

::: code-tabs
@tab java

```java
Map<Integer, TreeNode> map = new HashMap<>();
List<Integer> result = new ArrayList<>();

public List<Integer> distanceK(TreeNode root, TreeNode target, int k) {
    findParents(root);
    findDistance(target, null, 0, k);
    return result;
}

private void findDistance(TreeNode node, TreeNode from, int depth, int k) {
    if (node == null) {
        return;
    }
    if (depth == k) {
        result.add(node.val);
        return;
    }
    if (node.left != from) {
        findDistance(node.left, node, depth + 1, k);
    }
    if (node.right != from) {
        findDistance(node.right, node, depth + 1, k);
    }
    if (map.get(node.val) != from) {
        findDistance(map.get(node.val), node, depth + 1, k);
    }
}

private void findParents(TreeNode root) {
    if (root.left != null) {
        map.put(root.left.val, root);
        findParents(root.left);
    }
    if (root.right != null) {
        map.put(root.right.val, root);
        findParents(root.right);
    }
}
```

:::
::::
