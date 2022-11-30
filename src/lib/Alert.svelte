<script lang="ts">
	let className = '';
	export { className as class };
</script>

<div class="alert {className} shadow-lg rounded-none">
	<div>
		<span><slot /></span>
	</div>
</div>
