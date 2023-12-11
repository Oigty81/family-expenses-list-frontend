import { beforeEach, describe, expect, test} from "vitest";

import { createPinia, setActivePinia } from "pinia";

import { useUserStore  } from "@/stores/user.js";



describe('test "userStore"', () => {
    
    let userStore = null;

    beforeEach(() => {
        setActivePinia(createPinia());
        userStore = useUserStore();
    });

    test('whether initializes with correct values', () => {
        
        expect(userStore.IsAuthenticated).toBe(false);
        
    });
    //TODO:
});