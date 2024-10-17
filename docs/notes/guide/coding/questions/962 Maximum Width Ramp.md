---
title: 962 Maximum Width Ramp
createTime: 2024/10/15 17:23:58
permalink: /guide/coding/questions/962/
---

::: note Question
[Leetcode Link](https://leetcode.com/problems/maximum-width-ramp/description/?envType=company&envId=amazon&favoriteSlug=amazon-thirty-days)

:::

:::: details Solution
There are several things to note:

==sorting method:==
::: code-tabs
@tab java

```java

public int maxWidthRamp(int[] nums) {
    int length = nums.length;
    Integer[] sortedArray = new Integer[length];
    for (int i = 0; i < sortedArray.length; i++) {
        sortedArray[i] = i;
    }
    Arrays.sort(sortedArray, Comparator.comparingInt(a -> nums[a]));

    int maxWidth = 0;
    int pre = Integer.MAX_VALUE;
    for (Integer index : sortedArray) {
        maxWidth = Math.max(maxWidth, index - pre);
        pre = Math.min(pre, index);
    }
    return maxWidth;

}
```

:::
==Stack method:==
::: code-tabs
@tab java

```java
public int maxWidthRamp(int[] nums) {
    Stack<Integer> stack = new Stack<>();
    for (int i = 0; i < nums.length; i++) {
        if (stack.isEmpty() || nums[i] < nums[stack.peek()]) {
            stack.push(i);
        }
    }
    int pos = nums.length - 1;
    int result = 0;
    while (!stack.isEmpty()) {
        while (nums[pos] < nums[stack.peek()]) {
            pos--;
        }
        result = Math.max(result, pos - stack.pop());
    }
    return result;

}

```

::::
