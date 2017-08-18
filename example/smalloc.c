#include <stdio.h>
#include <stdlib.h>

void *xmalloc(size_t size, const char *filename, unsigned long line)
{
  void *ptr;

  if((ptr = malloc(size)) == NULL) {
    printf("Error : malloc in %s at : %lu", filename, line);
    exit(EXIT_FAILURE);
  }

  return (ptr);
}
