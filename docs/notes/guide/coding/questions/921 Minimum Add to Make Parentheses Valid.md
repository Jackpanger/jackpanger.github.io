---
title: 921. Minimum Add to Make Parentheses Valid
createTime: 2024/10/17 15:38:17
permalink: /guide/coding/questions/921/
---

::: note [Question]
[Leetcode Link](https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/description/?envType=company&envId=amazon&favoriteSlug=amazon-thirty-days)

:::
:::: details Solution
There are several things to note:

::: code-tabs
@tab java

```java
public int minAddToMakeValid(String s) {
    Stack<Character> stack = new Stack<>();
    for (int i = 0; i < s.length(); i++) {
        if (!stack.isEmpty()) {
            if (s.charAt(i) == ')' && stack.peek() == '(') {
                stack.pop();
                continue;
            }
        }
        stack.push(s.charAt(i));
    }
    return stack.size();
}
```

:::
::::
