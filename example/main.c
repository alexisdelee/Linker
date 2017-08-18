#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "smalloc.h"

int main()
{
    // secure malloc
    const char *sstr = "Hello, secure world !";
    size_t sizestr = strlen(sstr);
    char *ptr = smalloc(sizeof(char) * (sizestr + 1));

    strncpy(ptr, sstr, sizestr + 1);

    printf("%s\n", ptr);
    free(ptr);

    return 0;
}
