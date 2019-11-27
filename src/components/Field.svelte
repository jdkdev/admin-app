<script>
    export let type = 'text'
    export let value
    export let name
    export let label = name.replace('_', ' ')
    export let placeholder = name
    export let errors = []
</script>

<div class="field">
    <label>{label}</label>
    <div class="control">
        <input {type} {name} {value} {placeholder}>
    </div>
    {#if errors.length}
        <div class="error">{errors[0]}</div>
    {/if}
</div>
<style type="scss">
.field {
    margin-bottom: 1rem;
    label {
        text-transform: capitalize;
        display: inline-block;
        padding-top: calc(.375rem + 1px);
        padding-bottom: calc(.375rem + 1px);
        margin-bottom: 0;
        font-size: inherit;
        line-height: 1.5;
    }
    .control {
        display: block;
        width: 100%;
        height: calc(1.5em + .75rem + 2px);
        padding: .375rem .75rem;
        font-size: .9rem;
        font-weight: 400;
        line-height: 1.5;
        color: hsl(210, 8.8%, 31.4%);
        background-color: hsl(0, 0%, 100%);
        background-clip: padding-box;
        border: 1px solid hsl(263.1, 18.8%, 86.5%);
        border-radius: 5px;
        box-sizing: border-box;
    }
    input {
        background: transparent;
        border: none;
        width: 100%;
        &::placeholder {
            text-transform:capitalize;
        }
    }
    .errors {

    }
}
</style>