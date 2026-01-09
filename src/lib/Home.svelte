<script lang="ts">
    import { onMount } from 'svelte';
    const fullText = "Hello, I'm lnjng";
    let displayedText = '';
    let animationComplete = false;

    onMount(() => {
        let charIndex = 0;

        // Signal animation is starting (prevents vim cursor from showing)
        window.dispatchEvent(new CustomEvent('homeAnimationStart'));

        // Type out characters (slower at 150ms per character)
        const typeInterval = setInterval(() => {
            if (charIndex < fullText.length) {
                displayedText = fullText.slice(0, charIndex + 1);
                charIndex++;
            } else {
                clearInterval(typeInterval);
                animationComplete = true;
                // Dispatch custom event for layout to position vim cursor
                setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('homeAnimationComplete'));
                }, 200);
            }
        }, 150);

        return () => {
            clearInterval(typeInterval);
        };
    });
</script>

<svelte:head>
	<title>lnjng</title>
	<meta property="og:title" content="lnjng's Homepage" />
</svelte:head>

<div class="flex flex-col items-center justify-center h-full">
    <h1 class="text-4xl font-bold mb-8 text-nvim-blue">
        {displayedText}{#if !animationComplete}<span
            class="inline-block w-[0.6em] h-[1.1em] align-middle ml-[1px] bg-nvim-cursor opacity-50"
            style="transform: translateY(-2px);"
        ></span>{/if}
    </h1>
    <div class="text-center">
        <p class="mb-4">Lin Jiang</p>
        <p class="mb-2"></p>
        <a href="https://github.com/Injng" class="mb-4 hover:underline">github.com/Injng</a>
        <div class="p-8 text-nvim-green text-left">
            <p>type  :about<span class="text-nvim-blue">&lt;Enter&gt;</span>            to view about information</p>
            <p>type  :blog<span class="text-nvim-blue">&lt;Enter&gt;</span>             to view blog posts</p>
            <p>type  :notes<span class="text-nvim-blue">&lt;Enter&gt;</span>             to view notes</p>
            <br>
            <!--
            [TODO] search feature
            <p>type  /<span class="text-nvim-blue">&lt;Search term&gt;</span>           to search posts</p>
            <br>
            -->
            <p>type  :help<span class="text-nvim-blue">&lt;Enter&gt;</span>                to view the <a href="/help" class="underline text-nvim-blue hover:text-blue-800">help</a> page</p>
        </div>
    </div>
</div>
