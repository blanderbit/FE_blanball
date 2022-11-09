import { useField } from 'vee-validate';
import { computed, toRef } from 'vue';
import { modes } from "./interactionModes";

export const CustomModelWorker = (props) => {
    const {
        meta: modelMeta,
        value: modelValue,
        errorMessage: modelErrorMessage,
        handleChange: modelHandleChange,
        handleBlur: modelHandleBlur
    } = useField(
        toRef(props, 'name'),
        null,
        {
            validateOnValueUpdate: false,
        }
    );
    const modelHandlers = computed(() => {
        const on = {
            blur: modelHandleBlur,
            input: [(e) => modelHandleChange(e, false)],
        };

        // Get list of validation events based on the current mode
        const triggers = modes[props.mode]({
            errorMessage: modelErrorMessage,
            meta: modelMeta,
        });

        // add them to the "on" handlers object
        triggers.forEach((t) => {
            if (Array.isArray(on[t])) {
                on[t].push(modelHandleChange)
            } else {
                on[t] = modelHandleChange
            }
        });

        return on
    });

    return {
        modelMeta,
        modelValue,
        modelErrorMessage,
        modelHandleChange,
        modelHandleBlur,
        modelHandlers
    }
}